import React, { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';

const ExportPDFButton = ({ patientData, historialMonitoreo, chartElementId }) => {
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = async () => {
        if (!patientData || historialMonitoreo.length === 0) {
            alert("No hay suficientes datos para generar el reporte.");
            return;
        }

        setIsExporting(true);

        try {
            // 1. Configuración del PDF (A4 Vertical)
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pageWidth = pdf.internal.pageSize.getWidth();

            // Colores Corporativos
            const colorPrimary = '#6A5ACD';
            const colorSuccess = '#8BC34A';
            const colorText = '#333333';

            // 2. Encabezado y Branding
            // Logo Textual Simulado en PDF (Ya que es complicado cargar fuentes personalizadas rápidamente en jsPDF puro, usaremos texto estandarizado con colores)
            pdf.setFontSize(24);
            pdf.setTextColor(colorPrimary);
            pdf.setFont("helvetica", "bold");
            pdf.text("Mamás con ", 20, 30);

            // Añadir 'Fundamento' en verde (calculando el offset del texto anterior)
            const offset = pdf.getTextWidth("Mamás con ");
            pdf.setTextColor(colorSuccess);
            pdf.text("Fundamento", 20 + offset, 30);

            // Subtítulo del Certificado
            pdf.setFontSize(14);
            pdf.setTextColor(colorText);
            pdf.setFont("helvetica", "normal");
            pdf.text("Reporte de Monitoreo Gestacional", 20, 42);

            // Línea separadora
            pdf.setDrawColor(colorPrimary);
            pdf.setLineWidth(0.5);
            pdf.line(20, 48, pageWidth - 20, 48);

            // 3. Datos Básicos de la Paciente
            pdf.setFontSize(12);
            pdf.setFont("helvetica", "bold");
            pdf.text("Datos de la Paciente:", 20, 60);

            pdf.setFont("helvetica", "normal");
            pdf.text(`Estatura: ${patientData.talla} m`, 20, 70);
            pdf.text(`Peso Inicial (Sem 10): ${patientData.peso} kg`, 20, 78);
            pdf.text(`IMC Pregestacional: ${patientData.imc} (${patientData.clasificacion})`, 20, 86);

            // Estado y Recomendaciones actuales
            const ultimoControl = historialMonitoreo[historialMonitoreo.length - 1];
            pdf.setFont("helvetica", "bold");
            pdf.text("Estado Actual:", 100, 60);

            pdf.setFont("helvetica", "normal");
            pdf.text(`Semana Actual: ${ultimoControl.semana}`, 100, 70);
            pdf.text(`Peso Actual: ${ultimoControl.peso} kg`, 100, 78);

            // Función de formateo de Zona (ej. BAJO_PESO -> Bajo Peso)
            const formatZona = (zona) => String(zona).replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());

            pdf.setFont("helvetica", "bold");
            pdf.setTextColor(String(ultimoControl.zonaIMC).toUpperCase() === 'NORMAL' ? colorSuccess : colorPrimary);
            pdf.text(`Zona Actual: ${formatZona(ultimoControl.zonaIMC)}`, 100, 86);
            pdf.setTextColor(colorText);

            // 4. Capturar e Insertar la Gráfica de Atalah
            const chartElement = document.getElementById(chartElementId);
            if (chartElement) {
                // Título sección gráfica
                pdf.setFontSize(12);
                pdf.setFont("helvetica", "bold");
                pdf.text("Evolución de IMC vs. Guía MINSA:", 20, 105);

                // Forzar a html2canvas a ignorar el tamaño minúsculo del celular de la usuaria 
                // para que la captura de la gráfica siempre tenga proporciones de un escritorio
                const canvas = await html2canvas(chartElement, {
                    scale: 2,
                    windowWidth: 1200,
                    width: chartElement.scrollWidth > 1000 ? chartElement.scrollWidth : 1200,
                    onclone: function (clonedDoc) {
                        const clonedChart = clonedDoc.getElementById(chartElementId);
                        if (clonedChart) {
                            clonedChart.style.width = '1200px';
                            clonedChart.style.minWidth = '1200px';
                            clonedChart.style.maxWidth = '1200px';
                        }
                    }
                });
                const imgData = canvas.toDataURL('image/png');

                // Calcular proporciones para encajar en ancho del A4
                const imgWidth = pageWidth - 40; // 20mm margin por lado
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                pdf.addImage(imgData, 'PNG', 20, 115, imgWidth, imgHeight);

                // 5. Tabla de Historial (autoTable)
                const tableStartY = 115 + imgHeight + 10;

                pdf.setFontSize(12);
                pdf.setFont("helvetica", "bold");
                pdf.text("Historial Detallado de Registros:", 20, tableStartY);

                const tableColumn = ["Semana", "Peso (kg)", "IMC", "Diagnóstico (Zona)"];
                const tableRows = [];

                historialMonitoreo.forEach(record => {
                    const rowData = [
                        `Semana ${record.semana}`,
                        record.peso.toFixed(2),
                        record.imcPaciente ? record.imcPaciente.toFixed(2) : "-",
                        formatZona(record.zonaIMC)
                    ];
                    tableRows.push(rowData);
                });

                autoTable(pdf, {
                    startY: tableStartY + 5,
                    head: [tableColumn],
                    body: tableRows,
                    theme: 'striped',
                    headStyles: { fillColor: colorPrimary },
                    alternateRowStyles: { fillColor: [240, 230, 250] }, // Lavanda muy suave
                    styles: { font: "helvetica", fontSize: 10, cellPadding: 4 }
                });

                // 6. Pie de Página Comercial
                const finalY = pdf.lastAutoTable ? pdf.lastAutoTable.finalY : (tableStartY + 30);

                // Si la tabla rompió página, ajustamos la posición del footer al final de la página actual
                const pageHeightLimit = pdf.internal.pageSize.getHeight();
                const footerY = (finalY + 15 > pageHeightLimit) ? pageHeightLimit - 10 : finalY + 15;

                pdf.setFontSize(10);
                pdf.setFont("helvetica", "italic");
                pdf.setTextColor(100, 100, 100);
                pdf.text("Generado por Mamás con Fundamento App. Consulta siempre con tu profesional de la salud.", 20, footerY);
            } else {
                pdf.text("Error: No se pudo renderizar la gráfica para el reporte.", 20, 110);
            }

            // Descargar el Archivo
            pdf.save(`Reporte_Gestacional_Semana_${ultimoControl.semana}.pdf`);

        } catch (error) {
            console.error("Error al generar el PDF:", error);
            alert(`Hubo un error al generar el PDF: ${error.message || error}`);
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <button
            onClick={handleExport}
            disabled={isExporting}
            style={{
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                border: 'none',
                padding: '12px 20px',
                borderRadius: 'var(--radius-app)',
                cursor: isExporting ? 'wait' : 'pointer',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                width: '100%',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-app)',
                whiteSpace: 'normal',
                textAlign: 'center'
            }}
        >
            {isExporting ? 'Generando Reporte (PDF)...' : '🖨️ Descargar Certificado de Monitoreo'}
        </button>
    );
};

export default ExportPDFButton;

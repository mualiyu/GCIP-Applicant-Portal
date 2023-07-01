import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function convertToPDF(id, title) {
  const pageElement = document.getElementById(id);
  html2canvas(pageElement, { scrollY: -window.scrollY })
  .then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4'); // Set document size to A4
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const padding = 20;
    let imageWidth = pageWidth - padding * 2;
      let imageHeight = (imageWidth * canvas.height) / canvas.width;
      const maxImageHeight = pageHeight - padding * 2;

      if (imageHeight > maxImageHeight) {
        imageHeight = maxImageHeight;
        imageWidth = (imageHeight * canvas.width) / canvas.height;
      }

      const x = (pageWidth - imageWidth) / 2;
      const y = (pageHeight - imageHeight) / 2;
    pdf.addImage(imgData, 'PNG', padding, padding, imageWidth, imageHeight);
    pdf.save(`${title}.pdf`);
  })
    .catch((error) => {
      console.error('Error generating PDF:', error);
    });
}

export default convertToPDF;

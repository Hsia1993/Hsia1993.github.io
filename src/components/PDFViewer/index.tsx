function PDFViewer() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <embed
        src="/PhilXia_SDE.pdf"
        type="application/pdf"
        width="100%"
        height="100%"
      />
    </div>
  );
}

export default PDFViewer;

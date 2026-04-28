
type props = {
    code: string;
}

export function Preview({ code }: props) {
    return (
        <iframe
            sandbox="allow-scripts"
            style={{ width: "100%", height: "300px", border: "1px solid #ccc" }}
            srcDoc={code}
            title="preview"
        />
    );
}

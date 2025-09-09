export function ErrorView(props) {
    const {
        e
    } = props
    
    const msg = e instanceof Error ? e?.message : e;
    
    return (
        <div className="error">
            {msg}
        </div>
    )
}
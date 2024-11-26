import './page.css'
import Api from './api'
import Animation from './animation'
export default function Documentation() {
    return (
        <div className="documentation-container">
            <h1 className="documentation-title">Documentation</h1>
            <p className="documentation-description">
                Welcome to the documentation page. Here you will find all the
                necessary information to get started with our application.
            </p>

            <Api />
            <Animation />
        </div>
    )
}

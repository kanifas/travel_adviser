import React from "react"
import checkerUrl from "./checker.png"
import iconUrl from "./icon.svg"

export default (function () {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: `url(${checkerUrl})`
        }}>
            <img src={iconUrl} width="100" />
        </div>
    )
})
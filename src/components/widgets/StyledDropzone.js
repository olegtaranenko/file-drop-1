import React, { useMemo } from 'react';
import { usePromiseTracker } from "react-promise-tracker";
import { useDropzone } from 'react-dropzone';

import mimeTypes from '../../data/mimeTypes.json';
import supporting from '../../data/supportedFileTypes.json';

import LoadingIndicator from './LoadingIndicator';

const acceptableExtensions = {};

supporting.forEach((vendor, vIndex) => {
    const vendorName = Object.keys(vendor)[0];
    const vendorTypes = vendor[vendorName];

    vendorTypes.forEach((type, tIndex) => {
        const typeName = Object.keys(type)[0]
        const extensions = type[typeName];

        extensions.forEach((extension, eIndex) => {
            acceptableExtensions[extension] = mimeTypes[extension]
        })
    })
});

const uniqueMimeTypes = {};

Object.values(acceptableExtensions).forEach((mimeTypesByExt) => {
    mimeTypesByExt && mimeTypesByExt.forEach((mimeType) => {
        uniqueMimeTypes[mimeType] = true;
    })
})
const accept = Object.keys(uniqueMimeTypes).join(',');

export default function StyledDropzone({ onDrop, children, loading }) {
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        accept: accept,
        onDrop,
        noClick: loading,
        noDrag: loading,
        maxSize: 6E6
    });

    const { promiseInProgress } = usePromiseTracker();

    let classes = useMemo(() => ( [
        "drop-border",
        isDragActive ? "active" : "",
        isDragAccept ? "accept" : "",
        isDragReject ? "reject" : "",
        promiseInProgress ? "progress" : "",
        loading ? "reject" : "",
    ] ), [
        isDragActive,
        isDragReject,
        isDragAccept,
        promiseInProgress,
        loading,
    ]);
    if ( classes.includes("reject") ) {
        classes = classes.filter(( item => item !== "accept" ))
    }
    const className = classes.join(' ');

    return (
        <div className={"drop-container"}>
            <div className={className} {...getRootProps()}>
                <input {...getInputProps()} />
                <LoadingIndicator key={6}/>
                {children}
            </div>
        </div>
    );
}
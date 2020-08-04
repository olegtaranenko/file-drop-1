import React from "react";

import RenderAnalysis from "./RenderAnalysis";
import DownloadFile from "./DownloadFile";
import { Button, IssueMessage, SectionTitle } from "../../widgets";
import DownloadAnalysisReport from "./DownloadAnalysisReport";
import FileAttributes from "./FileAttributes";
import ButtonsContainer from '../../widgets/ButtonsContainer';

function RenderResults({ state, onAnotherFile }) {
    const { file, analysisReport, analysisReportString, validation } = state;

    if ( validation ) {
        return (
            <div className="validationErrors">
                <p>{validation}</p>
            </div>
        );
    }

    if ( file && analysisReport ) {
        const sanitisations = analysisReport.getElementsByTagName("gw:SanitisationItem");
        const remediations = analysisReport.getElementsByTagName("gw:RemedyItem");
        const issues = analysisReport.getElementsByTagName("gw:IssueItem");
        const [ { value: fileType } = { value: "unknown" } ] = analysisReport.getElementsByTagName("gw:FileType");
        const { name: fileName } = file;
        const hasIssues = issues.length;
        if ( sanitisations.length || remediations.length || hasIssues ) {
            return (
                <div className="analysis">
                    <IssueMessage hasIssues={hasIssues}/>
                    <SectionTitle context='regenerated'>Your Safe, Regenerated File Is Ready</SectionTitle>
                    <ButtonsContainer context="analysis" touchFull>
                        <DownloadFile file={file} hasIssues={hasIssues}/>
                        <DownloadAnalysisReport report={analysisReportString} filename={fileName}/>
                    </ButtonsContainer>

                    <FileAttributes file={file} fileType={fileType}/>

                    <RenderAnalysis
                        remediations={remediations}
                        sanitisations={sanitisations}
                        issues={issues}
                    />
                    <ButtonsContainer touchFull>
                        <Button context="analyze" onClick={onAnotherFile}>Sanitise another file</Button>
                    </ButtonsContainer>
                </div>
            );
        } else {
            return (
                <div className="is-clean analysis">
                    <SectionTitle context='clean'>File is clean!</SectionTitle>
                    <ButtonsContainer context="download" touchFull>
                        <DownloadAnalysisReport report={analysisReportString} filename={fileName}/>
                    </ButtonsContainer>
                    <FileAttributes file={file} fileType={fileType}/>
                    <ButtonsContainer touchFull>
                        <Button context="analyze" onClick={onAnotherFile}>Sanitise another file</Button>
                    </ButtonsContainer>
                </div>
            );
        }
    }

    return null;
}

export default RenderResults;

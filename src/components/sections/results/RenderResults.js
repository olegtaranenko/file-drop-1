import React from "react";
import RenderAnalysis from "./RenderAnalysis";
import DownloadFile from "./DownloadFile";
import IssueMessage from "../../widgets/IssueMessage";
import DownloadAnalysisReport from "./DownloadAnalysisReport";
import FileAttributes from "./FileAttributes";

function RenderResults( {state }) {
    const { file, analysisReport, analysisReportString, validation} = state;

  if (validation !== null && validation !== undefined && validation !== "") {
    return (
      <div className="validationErrors">
        <p>{validation}</p>
      </div>
    );
  }

  if (file !== null && file !== undefined && file !== "" && analysisReport !== null && analysisReport !== undefined && analysisReport !== "") {
    const sanitisations = analysisReport.getElementsByTagName("gw:SanitisationItem");
    const remediations = analysisReport.getElementsByTagName("gw:RemedyItem");
    const issues = analysisReport.getElementsByTagName("gw:IssueItem");
    const fileType = analysisReport.getElementsByTagName("gw:FileType")[0].value;

    if (sanitisations.length || remediations.length || issues.length) {
      return (
        <div className="analysis-results">
            <IssueMessage hasIssues={issues.length}/>
          <div className="download-container">
            <DownloadFile file={file} hasIssues={issues.length} />
            <DownloadAnalysisReport report={analysisReportString} filename={file.name} />
          </div>
          <br />
          <FileAttributes file={file} fileType={fileType} />
          <br />
          <RenderAnalysis
            remediations={remediations}
            sanitisations={sanitisations}
            issues={issues}
          />
        </div>
      );
    } else {
      return (
        <section className="is-clean analysis-results">
          <DownloadAnalysisReport report={analysisReportString} filename={file.name} />
          <h1>File is clean!</h1>
          <FileAttributes file={file} fileType={fileType} />
        </section>
      );
    }
  }

  return null;
}

export default RenderResults;
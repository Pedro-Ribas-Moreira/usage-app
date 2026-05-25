const API_URL = "https://cxapi.yunoenergy.ie:8080/api/hr/dashboard";
const POLL_MS = 30000;

const fields = {
    status: document.getElementById("api-status"),
    sourceLabel: document.getElementById("source-label"),
    sourceDetail: document.getElementById("source-detail"),
    employees: document.getElementById("employees-count"),
    processes: document.getElementById("process-count"),
    openCases: document.getElementById("open-cases-count"),
    overdue: document.getElementById("overdue-count"),
    lastUpdated: document.getElementById("last-updated"),
    processTableBody: document.getElementById("process-table-body"),
};

function formatNumber(value) {
    return new Intl.NumberFormat("en-IE").format(Number(value || 0));
}

function formatDate(value) {
    if (!value) return "--";
    return new Intl.DateTimeFormat("en-IE", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(new Date(value));
}

function setStatus(label, state) {
    fields.status.textContent = label;
    fields.status.className = `status ${state || ""}`.trim();
}

function renderProcesses(processes) {
    if (!processes?.length) {
        fields.processTableBody.innerHTML = `<tr><td colspan="5">No HR processes have been loaded yet.</td></tr>`;
        return;
    }

    fields.processTableBody.innerHTML = processes.map((process) => `
        <tr>
            <td>${process.name}</td>
            <td>${process.owner}</td>
            <td><span class="badge">${process.status}</span></td>
            <td>${formatNumber(process.openCases)}</td>
            <td>${formatNumber(process.overdueCases)}</td>
        </tr>
    `).join("");
}

function renderDashboard(data) {
    const metrics = data.metrics || {};

    fields.employees.textContent = formatNumber(metrics.employees);
    fields.processes.textContent = formatNumber(metrics.activeProcesses);
    fields.openCases.textContent = formatNumber(metrics.openCases);
    fields.overdue.textContent = formatNumber(metrics.overdueCases);
    fields.sourceLabel.textContent = data.source?.label || "HR data service";
    fields.sourceDetail.textContent = data.source?.detail || "Waiting for SQL data mapping.";
    fields.lastUpdated.textContent = `Last updated: ${formatDate(data.generatedAt)}`;

    renderProcesses(data.processSummary);
}

async function fetchDashboard() {
    try {
        setStatus("Updating", "");
        const response = await fetch(API_URL, { cache: "no-store" });

        if (!response.ok) {
            throw new Error(`API returned ${response.status}`);
        }

        const data = await response.json();
        renderDashboard(data);
        setStatus("API online", "ok");
    } catch (error) {
        console.error("HR dashboard request failed", error);
        setStatus("API offline", "error");
        fields.sourceLabel.textContent = "Unable to reach HR data service";
        fields.sourceDetail.textContent = "Check the report-api scheduled task after the API route is deployed.";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    fetchDashboard();
    setInterval(fetchDashboard, POLL_MS);
});

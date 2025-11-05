const cableData = [
    { distance: 100, connector: 'RJ45', standard: '10Base-T', type: 'Par trançado (CAT3 ou superior)', maxDistance: '100 m', speed: '10 Mbps' },
       { distance: 40000, connector: 'LC', standard: '10GBase-ER', type: 'Fibra: Monomodo', maxDistance: '40 km', speed: '10 Gbps' }
];

document.getElementById('distance').addEventListener('change', function() {
    const distance = parseInt(this.value);
    const connectorSelect = document.getElementById('connector');
    connectorSelect.innerHTML = '<option value="">--Selecione o Conector--</option>';

    if (!isNaN(distance)) {
        const connectors = [...new Set(cableData.filter(cable => cable.distance === distance).map(cable => cable.connector))];
        connectors.forEach(connector => {
            const option = document.createElement('option');
            option.value = connector;
            option.textContent = connector;
            connectorSelect.appendChild(option);
        });

        connectorSelect.disabled = false;
    } else {
        connectorSelect.disabled = true;
    }

    updateTable([]);
});

document.getElementById('connector').addEventListener('change', function() {
    const distance = parseInt(document.getElementById('distance').value);
    const connector = this.value;

    if (!isNaN(distance) && connector) {
        const filteredCables = cableData.filter(cable => cable.distance === distance && cable.connector === connector);
        updateTable(filteredCables);
    } else {
        updateTable([]);
    }
});

function updateTable(cables) {
    const tbody = document.getElementById('resultsTable').querySelector('tbody');
    tbody.innerHTML = '';

    cables.forEach(cable => {
        const row = document.createElement('tr');
        Object.values(cable).forEach(value => {
            const cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });
}

import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const BilanLine = ({ dataBilan }) => {
  const labels = useMemo(() => dataBilan.map(item => item.mois), [dataBilan]);

  const data = useMemo(() => ({
    labels,
    datasets: [
      {
        label: 'Total à Payer',
        data: dataBilan.map(item => parseFloat(item.total)),
        borderColor: '#00cc66',
        backgroundColor: '#00cc66',
        tension: 0.3
      },
      {
        label: 'Prêt Maximum',
        data: dataBilan.map(item => parseFloat(item.max)),
        borderColor: '#ffcc00',
        backgroundColor: '#ffcc00',
        tension: 0.3
      },
      {
        label: 'Prêt Minimum',
        data: dataBilan.map(item => parseFloat(item.min)),
        borderColor: '#ff4444',
        backgroundColor: '#ff4444',
        tension: 0.3
      }
    ]
  }), [dataBilan, labels]);

  const options = useMemo(() => ({
    responsive: true,
    plugins: {
      legend: {
        display: true
      }
    },
    scales: {
      y: {
        // beginAtZero: true,
        min: 0, // 👈 IMPORTANT : on force ici le 0 !
        ticks: {
            stepSize: 10000,
            precision: 0,   
            callback: function (value) {
            return new Intl.NumberFormat('fr-FR').format(value) + ' Ar';
            }
        }
      }
    }
  }), []);

  return <Line data={data} options={options} />;
};

export default BilanLine;

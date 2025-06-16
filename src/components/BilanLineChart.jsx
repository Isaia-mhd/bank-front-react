// BilanMultiBarChart.jsx
import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';

dayjs.locale('fr');

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BilanMultiBarChart = ({ dataBilan }) => {
  const labels = useMemo(() =>
    dataBilan.map(item => dayjs(item.mois).format('MMMM YYYY')), [dataBilan]);

  const data = useMemo(() => ({
    labels,
    datasets: [
      {
        label: 'Total à Payer',
        data: dataBilan.map(item => item.total),
        backgroundColor: '#00cc66',
      },
      {
        label: 'Prêt Maximum',
        data: dataBilan.map(item => item.max),
        backgroundColor: '#ffcc00',
      },
      {
        label: 'Prêt Minimum',
        data: dataBilan.map(item => item.min),
        backgroundColor: '#ff4444',
      }
    ]
  }), [dataBilan, labels]);

  const options = useMemo(() => ({
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    },
    scales: {
      y: {
        // beginAtZero: true,
        min: 0, // 👈 IMPORTANT : on force ici le 0 !
        ticks: {
            stepSize: 10000, // ou 10000 si tu veux plus fin
            callback: function (value) {
            return new Intl.NumberFormat('fr-FR').format(value) + ' Ar';
            }
        }
      }
    }
  }), []);

  

  return <Bar data={data} options={options} />;
};


export default BilanMultiBarChart;

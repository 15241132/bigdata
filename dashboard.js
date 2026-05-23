// ================= KATEGORI =================

fetch('/api/analytics/kategori')
.then(res => res.json())
.then(data => {

  document.getElementById('topKategori').innerText =
    data[0]?._id || '-';

  const totalRevenue =
    data.reduce((acc, item) => acc + item.total, 0);

  document.getElementById('totalRevenue').innerText =
    'Rp ' + totalRevenue.toLocaleString('id-ID');

  new Chart(document.getElementById('barChartKategori'), {

    type:'bar',

    data:{
      labels:data.map(d => d._id),

      datasets:[{
        label:'Revenue',
        data:data.map(d => d.total),
        backgroundColor:'#3b82f6',
        borderRadius:10
      }]
    }

  });

});

// ================= PEMBAYARAN =================

fetch('/api/analytics/pembayaran')
.then(res => res.json())
.then(data => {

  const total =
    data.reduce((acc, item) => acc + item.total_transaksi, 0);

  document.getElementById('totalTransaksi').innerText = total;

  new Chart(document.getElementById('doughnutPembayaran'), {

    type:'doughnut',

    data:{
      labels:data.map(d => d._id),

      datasets:[{
        data:data.map(d => d.total_transaksi),

        backgroundColor:[
          '#3b82f6',
          '#10b981',
          '#f59e0b',
          '#8b5cf6'
        ]
      }]
    }

  });

});

// ================= TREN =================

fetch('/api/analytics/tren')
.then(res => res.json())
.then(data => {

  new Chart(document.getElementById('lineChartTren'), {

    type:'line',

    data:{
      labels:data.map(d => d._id),

      datasets:[{
        label:'Trend Revenue',

        data:data.map(d => d.total),

        borderColor:'#ec4899',

        backgroundColor:'rgba(236,72,153,0.1)',

        fill:true,

        tension:0.4
      }]
    }

  });

});

// ================= KOTA =================

fetch('/api/analytics/kota')
.then(res => res.json())
.then(data => {

  document.getElementById('topKota').innerText =
    data[0]?._id || '-';

  new Chart(document.getElementById('horizontalBarKota'), {

    type:'bar',

    data:{
      labels:data.map(d => d._id),

      datasets:[{
        label:'Total Penjualan',

        data:data.map(d => d.total),

        backgroundColor:'#6366f1'
      }]
    },

    options:{
      indexAxis:'y'
    }

  });

});

// ================= PELANGGAN =================

fetch('/api/analytics/pelanggan')
.then(res => res.json())
.then(data => {

  new Chart(document.getElementById('pieChartPelanggan'), {

    type:'pie',

    data:{
      labels:data.map(d => d._id),

      datasets:[{
        data:data.map(d => d.total_omset),

        backgroundColor:[
          '#f43f5e',
          '#06b6d4'
        ]
      }]
    }

  });

});
// ================= AUTO KATEGORI =================

function updateKategoriDanHarga(){

  const select =
    document.getElementById('select_produk');

  const opsi =
    select.options[select.selectedIndex];

  document.getElementById('kategori_produk').value =
    opsi.getAttribute('data-kategori');

  document.getElementById('harga_satuan').value =
    opsi.getAttribute('data-harga');

}

// ================= LOAD DATA =================

async function fetchLogTransaksi(){

  const res = await fetch('/api/transaksi');

  const data = await res.json();

  const tbody =
    document.getElementById('tabelTransaksi');

  tbody.innerHTML = '';

  data.forEach(t => {

    tbody.innerHTML += `

      <tr>

        <td>
          <code>${t.id_transaksi}</code>
        </td>

        <td>
          <strong>${t.pelanggan.nama}</strong>
          <br>
          <small class="text-muted">
            ${t.pelanggan.tipe}
          </small>
        </td>

        <td>
          ${t.produk.nama_produk}
          <br>
          <span class="badge bg-primary">
            ${t.produk.kategori}
          </span>
        </td>

        <td class="fw-bold text-success">
          Rp ${t.pembayaran.total_bayar.toLocaleString()}
        </td>

        <td>

          <button
            class="btn btn-warning btn-sm"
            onclick="editTransaksi('${t.id_transaksi}','${t.pelanggan.nama}')"
          >
            Edit
          </button>

          <button
            class="btn btn-danger btn-sm"
            onclick="hapusTransaksi('${t.id_transaksi}')"
          >
            Hapus
          </button>

        </td>

      </tr>

    `;

  });

}

// ================= CREATE =================

document.getElementById('formTransaksi')
.addEventListener('submit', async (e)=>{

  e.preventDefault();

  const payload = {

    nama_pelanggan:
      document.getElementById('nama_pelanggan').value,

    tipe_pelanggan:
      document.getElementById('tipe_pelanggan').value,

    nama_produk:
      document.getElementById('select_produk').value,

    kategori_produk:
      document.getElementById('kategori_produk').value,

    harga_satuan:
      document.getElementById('harga_satuan').value,

    jumlah_beli:
      document.getElementById('jumlah_beli').value,

    metode_pembayaran:
      document.getElementById('metode_pembayaran').value,

    kota:
      document.getElementById('kota').value

  };

  const res = await fetch('/api/transaksi',{

    method:'POST',

    headers:{
      'Content-Type':'application/json'
    },

    body:JSON.stringify(payload)

  });

  if(res.ok){

    alert('Transaksi berhasil ditambahkan');

    fetchLogTransaksi();

    document.getElementById('formTransaksi').reset();

    updateKategoriDanHarga();

  }

});

// ================= UPDATE =================

async function editTransaksi(id,namaLama){

  const namaBaru =
    prompt('Edit nama pelanggan:',namaLama);

  if(!namaBaru) return;

  await fetch(`/api/transaksi/${id}`,{

    method:'PUT',

    headers:{
      'Content-Type':'application/json'
    },

    body:JSON.stringify({
      nama_pelanggan:namaBaru
    })

  });

  fetchLogTransaksi();

}

// ================= DELETE =================

async function hapusTransaksi(id){

  if(confirm('Yakin hapus transaksi?')){

    await fetch(`/api/transaksi/${id}`,{
      method:'DELETE'
    });

    fetchLogTransaksi();

  }

}

// ================= INIT =================

window.onload = ()=>{

  updateKategoriDanHarga();

  fetchLogTransaksi();

}
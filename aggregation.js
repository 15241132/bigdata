async function showAggr(endpoint){

  document.getElementById('endpointLabel')
  .innerText =
    `Endpoint aktif: GET ${endpoint}`;

  try{

    const res = await fetch(endpoint);

    const data = await res.json();

    document.getElementById('jsonViewer')
    .innerText =
      JSON.stringify(data,null,2);

  }catch(err){

    document.getElementById('jsonViewer')
    .innerText =
      'Terjadi kesalahan mengambil data aggregation.';

  }

}
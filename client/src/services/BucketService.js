const baseURL = 'http://localhost:3000/api/countries/';

export default {
  getBucketList() {
    return fetch(baseURL)
    .then(res => res.json())
  },

  postToBucketList(payload){
    return fetch(baseURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {'Content-Type': 'application/json'}
    }).then(res => res.json());
  },
  updateBucketList(id, payload){
    return fetch(baseURL + id, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {'Content-Type': 'application/json'}
    }).then(res => res.json())
  }
}

<template>
  <div id="app">
    <h2>Travel Bucket List</h2>

    <country-select :countries="countries"/>

    <country-detail v-if="selectedCountry" :selectedCountry="selectedCountry">
    </country-detail>

    <button v-if="!bucketList.includes(selectedCountry) && selectedCountry" v-on:click="addToBucketList">Add Country</button>

    <bucket-list :bucketList="bucketList"></bucket-list>
  </div>

</template>

<script>
import CountryDetail from '@/components/CountryDetail.vue';
import BucketList from '@/components/BucketList.vue';
import CountrySelect from '@/components/CountrySelect';
import BucketService from '@/services/BucketService';
import {eventBus} from '@/main.js';
export default {
  name: 'App',
  data() {
    return {
      countries: [],
      selectedCountry: null,
      bucketList: [],
      visited: false
    }
  },
  components: {
    'country-detail': CountryDetail,
    'bucket-list': BucketList,
    'country-select': CountrySelect
  },
  mounted(){
    this.getCountries();
    this.getBucketList();

    eventBus.$on('country-selected', (country) => {
      this.selectedCountry = country;
    })
  },
  methods: {
    getCountries(){
      fetch("https://restcountries.eu/rest/v2/all")
      .then(res => res.json())
      .then(countries => this.countries = countries)
    },
    getBucketList(){
      BucketService.getBucketList()
      .then(bucketList => this.bucketList = bucketList)
    },
    addToBucketList(){
      this.bucketList.push(this.selectedCountry)
      (BucketService.postToBucketList(this.selectedCountry))
    }
  }}
  </script>

  <style>
    .small-flag {
      height: 20px
    }



  </style>

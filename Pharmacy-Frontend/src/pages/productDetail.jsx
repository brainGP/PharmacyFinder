import React from 'react';
import { FaMapMarkerAlt, FaTruck, FaBoxOpen, FaStar } from 'react-icons/fa';
import { MdLocalPharmacy } from 'react-icons/md';
import Header from '../components/header';
import Action from '../components/productDetailsComponents/action'
function ProductDetail() {
  return (
    <div>
        <Header/>
        <div calss="flex">
            <Action class="flex-1"/>
            <div class="flex-1">

            </div>
        </div>
    </div>
  );
}

export default ProductDetail;
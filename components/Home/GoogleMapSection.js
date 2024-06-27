import React, { useEffect, useState, useContext } from 'react'
import { DirectionsRenderer, DirectionsService, GoogleMap, Marker, OverlayView, useJsApiLoader } from '@react-google-maps/api';
//import { sources } from 'next/dist/compiled/webpack/webpack';
import { SourceContext } from '@/context/SourceContext';
import { DestinationContext } from '@/context/DesinationContext';
import { MarkerF } from '@react-google-maps/api';

function GoogleMapSection() {
  const containerStyle = {
    width: '100%',
    height: window.innerWidth*0.45
  };
  const {source,setSource}=useContext(SourceContext);
  const {destination,setDestination}=useContext(DestinationContext);
  
  const [center,setCenter] =useState( {
    lat: -3.745,
    lng: -38.523
  });
  const [map, setMap] = React.useState(null)
  const [directionRoutePoints,setDirectionRoutePoints]=useState([]);
  useEffect(()=>{
    if(source?.length!=[]&&map){
      setCenter({
        lat:source.lat,
        lng:source.lng
      })
    }
    if(source.length!=[] && destination.length!=[]){
      directionRoute;
    }
  },[source])
  useEffect(()=>{
    if(destination?.length!=[]&&map){
      map.panTo({
        lat:source.lat,
        lng:source.lng
      })
      setCenter({
        lat:destination.lat,
        lng:destination.lng
      })
    }
    if(source.length!=[] && destination.length!=[]){
      directionRoute();
    }
  },[destination])
  const directionRoute=()=>{
    const DirectionsService=new google.maps.DirectionsService();
    DirectionsService.route({
      origin:{lat:source.lat,lng:source.lng},
      destination:{lat:destination.lat,lng:destination.lng},
      travelMode:google.maps.TravelMode.DRIVING
    },(result,status)=>{
      if(status==google.maps.DirectionsStatus.OK){
        setDirectionRoutePoints(result)
      }else{
        console.log('Error');
      }
    })
  }
  

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{mapId:'e2ddfd528e366606'}}
      >
       {source.length!=[]? <MarkerF 
        position={{lat:source.lat,lng:source.lng}}
        icon={{
          url:'/pickup.png',
          scaledSize:{
            width:20,
            height:20
          }
        }}
        >
          <OverlayView
          position={{lat:source.lat,lng:source.lng}}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className='w-57 p-2 bg-white font-bold inline-block'>
          <p className='text-black text-[12px]'>{source.label}</p>
            </div>

          </OverlayView>

        </MarkerF>:null}
        {destination.length!=[]? <MarkerF 
        position={{lat:destination.lat,lng:destination.lng}}
        icon={{
          url:'/drop.png',
          scaledSize:{
            width:20,
            height:20
          }
        }}
        >
          <OverlayView
          position={{lat:destination.lat,lng:destination.lng}}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className='w-57 p-2 bg-white font-bold inline-block'>
          <p className='text-black text-[12px]'>{destination.label}</p>
            </div>

          </OverlayView>
        </MarkerF>:null}
        { /* Child components, such as markers, info windows, etc. */ }
        
        <DirectionsRenderer
          directions={directionRoutePoints}
          options={{
            polylineOptions:{
              strokeColor:'#000',
              strokeWeight:3
            },
            suppressMarkers:true
          }}        
        />
      </GoogleMap>
  ) 
}

export default GoogleMapSection

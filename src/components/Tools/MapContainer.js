import React, { useEffect } from 'react';

import Button from './Button';

import './MapContainer.css';

const { kakao } = window;

function MapContainer(props) {

  useEffect(() => {

    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 

      mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 2 // 지도의 확대 레벨
      };

    // 지도를 생성합니다    
    var map = new kakao.maps.Map(mapContainer, mapOption);

    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder();

    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(props.myAddress, function (result, status) {

      console.log(status === kakao.maps.services.Status.OK);

      // 정상적으로 검색이 완료됐으면 
      if (status === kakao.maps.services.Status.OK) {

        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);


        // 결과값으로 받은 위치를 마커로 표시합니다
        var marker = new kakao.maps.Marker({
          map: map,
          position: coords
        });


        // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
        var mapTypeControl = new kakao.maps.MapTypeControl();

        // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
        // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
        map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

        // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
        var zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        /*
        // 인포윈도우로 장소에 대한 설명을 표시합니다
        var infowindow = new kakao.maps.InfoWindow({
          content: '<div style="width:150px;text-align:center;padding:4px 0;">봉사지역</div>'
        });
        infowindow.open(map, marker);
        */

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(coords);

      } else {
        alert("정상적인 위치가 아닙니다!");
      }

    })
  }, [props.myAddress]);

  return (
    <div className='mapContainer-main'>
      <a className='mapContainer-titleBox-a' href={'https://map.kakao.com/link/search/' + props.myAddress} rel="noreferrer" target='_blank'>
        <h2 className='mapContainer-titleBox-h2'>{props.myAddress}</h2>
        <Button spanStyle={{ margin: "5px" }} btnName='길찾기' />
      </a>
      <div id='map' style={{
        width: '1000px',
        height: '400px',
      }}></div>
    </div>
  );
}

export default MapContainer;
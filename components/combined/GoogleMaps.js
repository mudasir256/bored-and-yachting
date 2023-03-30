import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import Loading from '@/components/small/Loading'

export default function GoogleMaps({ lat, lng, width }) {
	const { isLoaded } = useLoadScript({
	    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
	    libraries: ['places']
	  });

	if (!isLoaded) {
	  return <Loading />
	}

	return(
		<GoogleMap
		   options={{
		   	disableDefaultUI: true,
		   	clickableIcons: true,
		   	scrollwheel: false
		   }}
		   zoom={14}
		   center={{
		   	lat,
		   	lng
		   }}
		   mapTypeId={google.maps.MapTypeId.ROADMAP}
		   mapContainerStyle={{ width: `${width}px`, height: '400px' }}
		   onLoad={() => console.log('google map loaded')}
		 >
		 	<Marker position={{ lat, lng }} />
		</GoogleMap>
	)
}
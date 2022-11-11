import WebView from 'react-native-webview';

export default function DetailScreen({navigation, route}) {
    const external_url = route.params.external
    return (
        <WebView source={{ uri: external_url }} />
    )
}


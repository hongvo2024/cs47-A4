import WebView from 'react-native-webview';

export default function PreviewSceen({navigation, route}) {
    const preview_url = route.params.preview
    return (
<WebView source={{uri: preview_url}}/>
    )
}
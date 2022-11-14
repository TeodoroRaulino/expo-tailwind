import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { 
  Text,
  TextInput,
  View, 
  Image,
} from 'react-native';
import { NativeWindStyleSheet } from 'nativewind';

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState([])
  
  useEffect(() => {
    fetch('https://api.github.com/users/ronaldaraujo')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [])

  const [search, setSearch] = useState('');
  const user = data.name

  let userFilter = () => {
    if(isLoading){
      return false
    }
    let filterUser = user.toLowerCase().includes(search.toLowerCase())
    return filterUser
  }

  return (
    <View className="flex p-5 justify-center items-center">
      <TextInput 
        value={search}
        onChange={ (event) => setSearch(event.target.value)}
        className="rounded border-slate-800 bg-slate-600 p-2 m-3 text-yellow-50" placeholder="Digite o usuário..." 
      />
      { !!userFilter() && search != ""? (
        <View className="flex justify-center items-center self-center p-5
        bg-slate-900 rounded-2xl">
          <Image source={{uri: data.avatar_url}} className="rounded-full h-36 w-36" />
          <Text className="text-lg text-white">{data.name}</Text>
          <Text className="text-base text-white opacity-80">{data.login}</Text>
          <Text className="text-base text-white text-justify p-2">{data.bio}</Text>
          <View className="flex justify-start">
            <View className="flex flex-row p-3">
              <Image source={require('./assets/images/location.svg')} className="w-8"></Image>
              <Text className="text-base text-white p-2">{data.location}</Text>
            </View>
            <View className="flex flex-row p-3">
              <Image source={require('./assets/images/twitter.svg')} className="h-10 w-10"></Image>
              <Text className="text-base text-white p-2">{data.twitter_username}</Text>
            </View>
            <View className="flex flex-row items-center">
              <Image source={require('./assets/images/follow.svg')} className="h-11 w-14"></Image>
              <Text className="text-base text-white p-2">Seguidores: {data.followers}<br/>Seguindo: {data.following}</Text>
            </View>
          </View>
        </View>
      ) : (
        <Text className="text-center text-2xl text-neutral-800 p-5">Aguardando ou não existe</Text> 
      )}
    </View>
  )
}
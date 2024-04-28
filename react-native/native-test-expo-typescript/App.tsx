import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  Button,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

interface Contained {
  id: number;
  name: string;
  action: string;
  amount: number;
  unit: string;
}

interface Type {
  id: number;
  name: string;
}

interface Taboo {
  id: number;
  name: string;
  description: string;
}

interface Recommendation {
  id: number;
  name: string;
  description: string;
}

interface MedicineData {
  id: number;
  name: string;
  company: string;
  imageUrl: string;
  containeds: Contained[];
  types: Type[];
  taboo: Taboo[];
  recommend: Recommendation[];
}

const MedicineDetailScreen: React.FC = () => {
  const [id, setId] = useState('');
  const [medicineData, setMedicineData] = useState<MedicineData>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://7llcnm7q3l.execute-api.ap-northeast-2.amazonaws.com/exam?id=${id}`
      );
      const data: MedicineData = await response.json();
      setMedicineData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Contained }) => (
    <View style={{ marginVertical: 10, paddingHorizontal: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.name}</Text>
      <Text style={{ fontSize: 16, marginTop: 5 }}>{item.action}</Text>
      <Text style={{ fontSize: 16, marginTop: 5 }}>
        Amount: {item.amount} {item.unit}
      </Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ backgroundColor: '#fff', padding: 20 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
            marginTop: 50,
          }}
        >
          <TextInput
            style={{
              flex: 1,
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              marginRight: 10,
              paddingHorizontal: 10,
            }}
            placeholder='Enter ID'
            onChangeText={(text) => setId(text)}
            value={id}
          />
          <Button title='Search' onPress={fetchData} />
        </View>
        {isLoading ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <ActivityIndicator size='large' color='#0000ff' />
          </View>
        ) : (
          <View>
            {medicineData && (
              <>
                <View style={{ alignItems: 'center' }}>
                  <Image
                    source={{ uri: medicineData.imageUrl }}
                    style={{ width: 200, height: 200, resizeMode: 'contain' }}
                  />
                  <Text
                    style={{ fontSize: 24, fontWeight: 'bold', marginTop: 10 }}
                  >
                    {medicineData.name}
                  </Text>
                  <Text style={{ fontSize: 18, marginTop: 5 }}>
                    {medicineData.company}
                  </Text>
                </View>

                <View style={{ marginVertical: 20 }}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                    Contained Ingredients:
                  </Text>
                  <FlatList
                    data={medicineData.containeds}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                  />
                </View>

                <View style={{ marginVertical: 20 }}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                    Types:
                  </Text>
                  <Text style={{ fontSize: 16, marginTop: 5 }}>
                    {medicineData.types.map((type) => type.name).join(', ')}
                  </Text>
                </View>

                <View style={{ marginVertical: 20 }}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                    Taboo:
                  </Text>
                  {medicineData.taboo.map((taboo) => (
                    <View key={taboo.id} style={{ marginTop: 5 }}>
                      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                        {taboo.name}
                      </Text>
                      <Text style={{ fontSize: 16 }}>{taboo.description}</Text>
                    </View>
                  ))}
                </View>

                <View style={{ marginVertical: 20 }}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                    Recommendations:
                  </Text>
                  <FlatList
                    data={medicineData.recommend}
                    renderItem={({ item }) => (
                      <View style={{ marginTop: 5 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                          {item.name}
                        </Text>
                        <Text style={{ fontSize: 16 }}>{item.description}</Text>
                      </View>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                  />
                </View>
              </>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default MedicineDetailScreen;

import {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

function BibleVerse(): JSX.Element {
  interface Verse {
    bookname: string;
    chapter: string;
    text: string;
    verse: string;
  }
  const [verse, setVerse] = useState<Verse[]>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://labs.bible.org/api/?passage=votd&type=json',
      );
      const data = await response.json();
      setVerse(data);
    };
    fetchData();
  }, []);
  return (
    <>
      {verse ? (
        <>
          <View style={{backgroundColor: 'black'}}>
            <Text
              style={{
                color: 'lightpink',
                fontSize: 14,
                fontWeight: 'bold',
                textAlign: 'center',
                paddingBottom: 15,
                paddingTop: 15,
              }}>
              Verse of the day 😇
            </Text>
          </View>
          <Text
            style={{
              marginTop: 15,
              textAlign: 'center',
              fontSize: 12,
              fontWeight: 'bold',
              marginBottom: 15,
            }}>
            {verse[0].bookname + ' '}
            <Text style={{fontSize: 12, fontWeight: 'bold', color: 'red'}}>
              {verse[0].chapter + ' : '}
            </Text>
            <Text style={{fontSize: 12, fontWeight: 'bold', color: 'green'}}>
              {verse[0].verse}
            </Text>
          </Text>
          <Text style={[styles.margins, {fontSize: 10, textAlign: 'center'}]}>
            {verse[0].text}
          </Text>
        </>
      ) : (
        <>
          <Text>Loading...</Text>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  margins: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
  },
});

export default BibleVerse;

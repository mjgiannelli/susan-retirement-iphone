import {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {
  date: string;
}

function Countdown({date}: Props): JSX.Element {
  const [timeLeft, setTimeLeft] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [businessDaysLeft, setBusinessDaysLeft] = useState<string>('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentDate = new Date();

      // Split the date into components
      const [month, day, year] = date.split('/').map(Number);

      // Construct the target date
      const targetDate = new Date(year, month - 1, day); // Note: months are 0-indexed in JavaScript

      const diff = targetDate.getTime() - currentDate.getTime();

      if (diff <= 0) {
        clearInterval(intervalId);
        return;
      }

      const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
      const years = Math.floor(totalDays / 365);
      const days = totalDays % 365;
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        years: years,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [date]);

  useEffect(() => {
    function calcNumOfBusinessDaysLeft(years: number) {
      let startDate = new Date();
      let businessDays = 0;

      // Split the target date into components
      const [month, day, year] = date.split('/').map(Number);

      // Construct the target date
      const targetDate = new Date(year, month - 1, day); // Note: months are 0-indexed

      let calcDate = new Date(startDate);

      while (calcDate < targetDate) {
        if (!(calcDate.getDay() === 6 || calcDate.getDay() === 0)) {
          businessDays++;
        }
        calcDate.setDate(calcDate.getDate() + 1);
      }

      // subtract out holidays
      let holidays = years * 14 + 14;
      setBusinessDaysLeft((businessDays - holidays).toString());
    }
    calcNumOfBusinessDaysLeft(timeLeft.years);
  }, [date, timeLeft.years]);

  return (
    <>
      {timeLeft.years === 0 &&
      timeLeft.days === 0 &&
      timeLeft.minutes === 0 &&
      timeLeft.hours === 0 &&
      timeLeft.seconds === 0 ? (
        <>
          <Text
            style={{
              fontSize: 36,
              fontWeight: 'bold',
              textAlign: 'center',
              marginTop: 30,
            }}>
            Loading...
          </Text>
        </>
      ) : (
        <View style={styles.margins}>
          <View style={styles.timeBanner}>
            <View style={styles.timeContainer}>
              <Text style={styles.time}>{timeLeft.years}</Text>
              <Text style={styles.timeLabel}>Years</Text>
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.time}>{timeLeft.days}</Text>
              <Text style={styles.timeLabel}>Days</Text>
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.time}>{timeLeft.hours}</Text>
              <Text style={styles.timeLabel}>Hours</Text>
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.time}>{timeLeft.minutes}</Text>
              <Text style={styles.timeLabel}>Minutes</Text>
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.time}>{timeLeft.seconds}</Text>
              <Text style={styles.timeLabel}>Seconds</Text>
            </View>
          </View>
          <View style={{marginBottom: 30}}>
            <Text
              style={{fontSize: 14, fontWeight: 'bold', textAlign: 'center'}}>
              {'Working Days Left: '}
              <Text style={{fontSize: 14, color: 'green', fontWeight: 'bold'}}>
                {businessDaysLeft}
              </Text>
            </Text>
          </View>
        </View>
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
  timeBanner: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 30,
  },
  timeContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timeLabel: {
    fontSize: 8,
  },
});

export default Countdown;

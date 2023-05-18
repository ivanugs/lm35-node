#define TEMP_SENSOR 0

void setup() {
  Serial.begin(9600);
}

int signalVoltage, celsiusTemp;

void loop() {
  // analog Signal 0 to 1023
  signalVoltage = analogRead(TEMP_SENSOR);
  
   // Convert to celsius Temperature
  celsiusTemp = (5 * signalVoltage * 100) / 1024;

  // Print in the serial Monitor
  Serial.println(celsiusTemp);
  
  delay(300000); // we read signal every 500ms
}

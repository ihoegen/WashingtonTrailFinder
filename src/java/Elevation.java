import java.net.*;
import java.io.*;

public class Elevation {

  public static void main(String[] args) throws Exception {
    String lat = args[0];
    String lng = args[1];
    String coordinateAPI = "https://maps.googleapis.com/maps/api/elevation/json?locations=" + lat + "," + lng + "&key=AIzaSyCZvfnTZCqtieHQH1Vsmby3kT_sGZ5K1UI";
    URL url = new URL(coordinateAPI);
    URLConnection connection = url.openConnection();
    BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
    String inputLine;
    while ((inputLine = in.readLine()) != null) {
      System.out.println(inputLine);
    }
      in.close();
  }
}

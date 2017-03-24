import java.io.File;
import java.util.Scanner;
 
public class DisplayFile {
     
    private String fileOutput;
    public String getFileOutput() {
        return fileOutput;
    }
     
    public void display(String path) {
        Scanner scan = null;
        StringBuffer buffer;
        try {
            buffer = new StringBuffer();
 
            scan = new Scanner(new File(path), "UTF-8");
 
            String readdata = "";
            while (scan.hasNext() && (readdata = scan.nextLine()) != null) {
 
                buffer.append(readdata).append('\n');
            }
            this.fileOutput = buffer.toString();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if(scan != null) {
                scan.close();
                scan = null;
            }
        }
    }
 
}

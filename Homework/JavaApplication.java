import java.awt.BorderLayout;
import java.awt.EventQueue;
import java.awt.FileDialog;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Menu;
import java.awt.MenuBar;
import java.awt.MenuItem;
import java.awt.MenuShortcut;
import java.awt.TextArea;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextArea;
import javax.swing.JTextField;
import javax.swing.border.EmptyBorder;

public class JavaApplication extends JFrame {

	
	private TextArea resultDisplay, display;
	private JTextArea commentText;
	private JButton run, gradeButton, commentButton;
	private JTextField gra;
	private JLabel graLab, commentLabel, resultLabel;
	private JPanel  runPanel;
	private MenuBar bar;         
	private Menu fileMenu;
	private MenuItem openItem, saveItem, closeItem, nextItem;
	private FileDialog openDia, saveDia, nextDia;
	private File file;
	private String dirpath, fileName;



	public static void main(String[] args) {

					JavaApplication java = new JavaApplication();

				}
			

	/**
	 * Create the frame.
	 */
	public JavaApplication() {
		resultDisplay = new TextArea();
		// run button
		run = new JButton("Execute");
		runPanel = new JPanel();
		runPanel.setLayout(new GridBagLayout());
		
		// grade area
		//graLab = new JLabel("Grade");
		gra = new JTextField("", 3);
		gradeButton = new JButton("Save Grade");

		// comment area
		commentLabel = new JLabel("Comment");
		commentText = new JTextArea("");
		commentText.setLineWrap(true);
		commentButton = new JButton("Save Comment");

		// menu bar
		bar = new MenuBar(); // 
		fileMenu = new Menu("file");// Initial menu
		// fileMenu.setShortcut(new MenuShortcut(KeyEvent.VK_F)); 
		openItem = new MenuItem("open(O)");// create open item
		openItem.setShortcut(new MenuShortcut(KeyEvent.VK_O));   //set shortcut for OpenItem 
		saveItem = new MenuItem("save");// create save item
		saveItem.setShortcut(new MenuShortcut(KeyEvent.VK_S));
		closeItem = new MenuItem("quit");
		closeItem.setShortcut(new MenuShortcut(KeyEvent.VK_Q));
		nextItem = new MenuItem("next");
		nextItem.setShortcut(new MenuShortcut(KeyEvent.VK_N));
		fileMenu.add(openItem);
		fileMenu.add(saveItem);
		fileMenu.add(nextItem);
		fileMenu.add(closeItem);
		bar.add(fileMenu);
		this.setMenuBar(bar);

		display = new TextArea();
		resultLabel = new JLabel("Output");

		openDia = new FileDialog(this, "open", FileDialog.LOAD);
		saveDia = new FileDialog(this, "save", FileDialog.SAVE);
		nextDia = new FileDialog(this, "next", FileDialog.LOAD);

		this.setTitle("Homework Application");
		this.setBounds(300, 100, 700, 600);
		this.setLayout(new GridBagLayout());

		// Add components into frame
		GridBagConstraints c = new GridBagConstraints();
		c = new GridBagConstraints();
		c.fill = GridBagConstraints.HORIZONTAL;
		c.gridx = 0; 
		c.gridy = 0;
		c.gridwidth = 8;
		c.gridheight = 4;
		this.add(display, c);

		c = new GridBagConstraints();
		c.fill = GridBagConstraints.NONE;
		c.gridx = 9; 
		c.gridy = 3;
		//c.gridx = 1;
		//c.gridy = 3;
		c.gridwidth = 1;
		this.add(run, c);

		/*c = new GridBagConstraints();
		c.fill = GridBagConstraints.HORIZONTAL;
		//c.gridx = 9; 
		//c.gridy = 4;
		c.gridx = 2;
		c.gridy = 5;
		c.gridwidth = 1;
		this.add(graLab, c);*/

		c = new GridBagConstraints();
		c.fill = GridBagConstraints.NONE;
		c.gridx = 8; 
		c.gridy = 5;
		c.gridwidth = 1;
		this.add(gra, c);

		c = new GridBagConstraints();
		c.fill = GridBagConstraints.NONE;
		c.gridx = 9; 
		c.gridy = 5;
		c.gridwidth = 1;
		this.add(gradeButton, c);

		c = new GridBagConstraints();
		c.fill = GridBagConstraints.HORIZONTAL;
		c.gridx = 8; 
		c.gridy = 9;
		c.gridwidth = 1;
		this.add(commentLabel, c);

		c = new GridBagConstraints();
		c.fill = GridBagConstraints.NONE;
		//c.gridx = 9; 
		//c.gridy = 8;
		c.gridx = 7;
		c.gridy = 10;
		c.gridwidth = 2;
		c.gridheight = 1;
		this.add(commentText, c);

		c = new GridBagConstraints();
		c.fill = GridBagConstraints.NONE;
		c.gridx = 9; 
		c.gridy = 10;
		c.gridwidth = 1;
		this.add(commentButton, c);

		c = new GridBagConstraints();
		c.fill = GridBagConstraints.HORIZONTAL;
		c.gridx = 0; 
		c.gridy = 7;
		c.gridwidth = 1;
		this.add(resultLabel, c);

		c = new GridBagConstraints();
		c.fill = GridBagConstraints.NONE;
		c.gridx = 0; 
		c.gridy = 8;
		c.gridwidth = 1;
		c.gridheight = 1;
		this.add(resultDisplay, c);

		this.setVisible(true);
		this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

		myEvent();
	}

	// Event method for components
	private void myEvent() {
		// action of openItem;
		openItem.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				
				openDia.setVisible(true);
				
				dirpath = openDia.getDirectory();
				fileName = openDia.getFile();
				
				if (dirpath == null || fileName == null)
					return;
				else
					display.setText(null);
				file = new File(dirpath, fileName);

				// Clear the result Display
				if (!"".equals(resultDisplay.getText())) {
					resultDisplay.setText(null);
				}
				

				// Display the code file into TextArea
				try {
					BufferedReader bufr = new BufferedReader(new FileReader(file));
					String line = null;
					while ((line = bufr.readLine()) != null) {
						display.append(line + "\r\n");
					}
					bufr.close();
				} catch (FileNotFoundException e1) {
					e1.printStackTrace();
				} catch (IOException e1) {
					e1.printStackTrace();
				}
			}
		});
		// next Item listener
		nextItem.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				
				nextDia.setVisible(true);
				
				dirpath = nextDia.getDirectory();
				fileName = nextDia.getFile();
				
				if (dirpath == null || fileName == null)
					return;
				else
					display.setText(null);
				file = new File(dirpath, fileName);

				// Clear the result Display
				if (!"".equals(resultDisplay.getText())) {
					resultDisplay.setText(null);
				}
				

				// Display the code file into TextArea
				try {
					BufferedReader bufr = new BufferedReader(new FileReader(file));
					String line = null;
					while ((line = bufr.readLine()) != null) {
						display.append(line + "\r\n");
					}
					bufr.close();
				} catch (FileNotFoundException e1) {
					e1.printStackTrace();
				} catch (IOException e1) {
					e1.printStackTrace();
				}
			}
			});
				// save event listen
				saveItem.addActionListener(new ActionListener() {
					public void actionPerformed(ActionEvent e) {
						if (file == null) {
						saveDia.setVisible(true);
						String dirpath = saveDia.getDirectory();
						String fileName = saveDia.getFile();
						
						if (dirpath == null || fileName == null)
							return;
						else
							file=new File(dirpath,fileName);
						}
						try {
							BufferedWriter bufw = new BufferedWriter(new FileWriter(file));
							
							String text = display.getText();
							bufw.write(text);
							
							bufw.close();
						} catch (IOException e1) {
							
							e1.printStackTrace();
						}
					}
				});
				// Close event listener
				closeItem.addActionListener(new ActionListener() {
					public void actionPerformed(ActionEvent e) {
						System.exit(0);
					}
				});
			}
			
 // Functions of buttons yet to be implemented. 
}
			

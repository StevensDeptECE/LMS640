import java.io.*;
import java.net.URL;
import java.net.URLClassLoader;
import java.util.Arrays;
import java.util.*;

import javax.tools.*;
public class test_compilerapi
{
	private static void compilejava() throws Exception{
		JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();
		// 建立DiagnosticCollector对象 
		DiagnosticCollector<JavaFileObject> diagnostics = new DiagnosticCollector<JavaFileObject>(); 
		StandardJavaFileManager fileManager = compiler.getStandardFileManager(diagnostics, null, null);
		// 建立用于保存被编译文件名的对xiang
		// 每个文件被保存在一个从JavaFileObject继承的类中 
		Iterable<? extends JavaFileObject> compilationUnits = fileManager.getJavaFileObjectsFromStrings(Arrays.asList("src/test.java"));
		Iterable<String> options = Arrays.asList("-d", "/Users/sihanwang/Desktop");
		JavaCompiler.CompilationTask task = compiler.getTask(null, fileManager,diagnostics, options, null, compilationUnits);
		// 编译源程式
		boolean success = task.call();
		fileManager.close();
		System.out.println((success)?"build success":"build fail");
		for (Diagnostic diagnostic : diagnostics.getDiagnostics())
			System.out.printf(
			"Code: %s%n" +
			"Kind: %s%n" +
			"Position: %s%n" +
			"Start Position: %s%n" +
			"End Position: %s%n" +
			"Source: %s%n" +
			"Message: %s%n",
			diagnostic.getCode(), diagnostic.getKind(),
			diagnostic.getPosition(), diagnostic.getStartPosition(),
			diagnostic.getEndPosition(), diagnostic.getSource(),
			diagnostic.getMessage(null));
	}
	public static void main(String args[]) throws Exception{
		compilejava();
	}
} 
class MemoryClassLoader extends URLClassLoader {

    Map<String, byte[]> classBytes = new HashMap<String, byte[]>();

    public MemoryClassLoader(Map<String, byte[]> classBytes) {
        super(new URL[0], MemoryClassLoader.class.getClassLoader());
        this.classBytes.putAll(classBytes);
    }

    @Override
    protected Class<?> findClass(String name) throws ClassNotFoundException {
        byte[] buf = classBytes.get(name);
        if (buf == null) {
            return super.findClass(name);
        }
        classBytes.remove(name);
        return defineClass(name, buf, 0, buf.length);
    }
}

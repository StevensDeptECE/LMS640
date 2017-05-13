package com.rl.controller;


import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import javax.tools.JavaCompiler;
import javax.tools.ToolProvider;

public class DynamicCompileDemo {

    static void eval(String source) {
        //构建一个类的源代码
        StringBuffer sourceCode = new StringBuffer();
        sourceCode.append("public class Temp {").append("\r\n")
                .append("public static String call(String args) {").append("\r\n")
                .append("System.out.println(\""+source+"\");").append("\r\n")
                .append("return \"Hello, " + source + "\";").append("\r\n")
                .append("}").append("\r\n")
                .append("}");
        try {
            //将源文件写入到磁盘中
            String javaFileName = "Temp.java";
            //生成的Java源文件存放到<module>/build/generated/source/java目录下  (开发工具为Android Studio, java-demo是我的module名称)
            File sourceDir = new File("java-demo/build/generated/source/java");
            if (!sourceDir.exists()) {
                sourceDir.mkdirs();
            }
            File javaFile = new File(sourceDir, javaFileName);
            PrintWriter writer = new PrintWriter(new FileWriter(javaFile));
            writer.write(sourceCode.toString());
            writer.flush();
            writer.close();

            //动态编译磁盘中的代码
            //生成的字节码文件存放到<module>/build/classes/main目录下
            File distDir = new File("java-demo/build/classes/main");
            if (!distDir.exists()) {
                distDir.mkdirs();
            }
            JavaCompiler javac = ToolProvider.getSystemJavaCompiler();
            //JavaCompiler最核心的方法是run, 通过这个方法编译java源文件, 前3个参数传null时, 
            //分别使用标准输入/输出/错误流来 处理输入和编译输出. 使用编译参数-d指定字节码输出目录.
            int compileResult = javac.run(null, null, null, "-d", distDir.getAbsolutePath(), javaFile.getAbsolutePath());
            //run方法的返回值: 0-表示编译成功, 否则表示编译失败
            if(compileResult != 0) {
                System.err.println("编译失败!!");
                return;
            }

            //动态执行 (反射执行)
            Class klass = Class.forName("Temp");
            Method evalMethod = klass.getMethod("call", String.class);
            String result = (String)evalMethod.invoke(klass.newInstance(), source);
            System.out.println("eval(" + source + ") = " + result);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InstantiationException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        eval("Lucy");
    }
}
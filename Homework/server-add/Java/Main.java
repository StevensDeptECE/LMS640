

class Main {
    public static void println(Object line) {
        System.out.println(line);
    }
    public static void main(String args[]) {
        System.out.println("Hello world");
        Car car = new Car("wuyan");
        Bus bus = new Bus("yuyu");
        println(car.getName());
        println(bus.getName());
    }
}







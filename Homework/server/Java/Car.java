class Car {

    private String _priName;

    public String _pubName;

    public Car(String name) {
        _priName = name;
    }

    public String getName() {
        return _priName;
    }

    public void setName(String newName) {
        _priName = newName;
    }
    public static void main(String args[]) {
        System.out.println("hwllo");
    }
}
class Bus {

    private String _priName;

    public String _pubName;

    public Bus(String name) {
        _priName = name;
    }

    public String getName() {
        return _priName;
    }

    public void setName(String newName) {
        _priName = newName;
    }    
}
# spot_me
### Requirements
    sudo apt install openjdk-11-jdk 
    wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.7.0-linux-x86_64.tar.gz (gettting elasticsearch )
    tar -xzf elasticsearch-7.7.0-linux-x86_64.tar.gz 
    sudo apt install npm 
    npm install @appbseio/reactivesearch 
    npm install -g create-react-app 
    create-react-app   name_of_your_app (It will make a directory named name_of_your_app and install required dependencies to it.)
    

###### changes to be made in Elasticsearch configuration file 
    • Go to elasticsearch directory (where it was extracted) → config → elasticsearch.yml
    Everything is commented out initially. Things to specify
    • <cluster.name: my_cluster_name>
    • <node.name: node_name>
    • For Master node: <node.master: true>
    • For Data nodes: <node.data: true>
    • <network.host: host_ip_address>
    • <http.port: 9200>
    
## Running
    cd elasticsearch_directory
    bin/elasticsearch 
    cd  name_of_your_app 
    npm start

### Steps to show images or Videos 
    1. Go to your name_of_your_app/src directory replace App.js from above App.js similarly for App.css .
    2. Go to name_of_your_app/public directory, copy frame.py and push_to_es.py file here .
    3. run frame.py here with terminal.
    4. run push_to_es.py here with the terminal.
    5. relod the page it must render all images and Videos or images .(in our case it will render only if data pushed to es cluster has the same mapping that i defined in python script.)


# spot_me
### Requirements
    sudo apt install openjdk-11-jdk<br />
    wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.7.0-linux-x86_64.tar.gz <br />
    tar -xzf elasticsearch-7.7.0-linux-x86_64.tar.gz <br />
    sudo apt install npm <br />
    npm install @appbseio/reactivesearch <br />
    npm install -g create-react-app <br />
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
  cd  name_of_your_app
  npm start

### Steps to show images or Videos 
    1. Go to name_of_your_app/public directory and copy all images here .
    (for instance : in my case - i have path as one field where path for all images is defined as 
    'path': 'frames1/name_of_frame.PNG'. So i created folder named frames1 inside  name_of_your_app/public  folder and copied all my images/frames corresponding to camera_id 1 to it. Similarly, for camera_id 2 . 
    2.  Go to name_of_your_app/src folder and under open App.js and add your components here .
    (in our case just copy and paste the code in it and just change <br />
    <ReactiveBase
    app=”elasticsearch_index_name"
    url ="http://localhost:9200">.) <br />
    3. relod the page it must render all images and Videos or images .(in our case it will render only if data pushed to es cluster has the same mapping that i defined in python script.)


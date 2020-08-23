import React, { Component } from 'react';
import {
  ReactiveBase,
  ReactiveList,
  DataSearch,
  SingleList,
  CategorySearch,
  SingleRange,
  ResultCard,
  DateRange,
  MultiList,
  RangeSlider
} from '@appbaseio/reactivesearch';

import './App.css';

class Main extends React.Component {
  render() {
    return (
      <div className="main-container">
        <ReactiveBase

          app="spot"
          url="http://localhost:9200"

        >
          <div className="navbar">
            <div className="logo">
              The Imagesearch App
          </div>


            <DataSearch // text
              react="camera_id"
              componentId="authors"
              customQuery={(value, props) => ({
                "query": {
                  "bool": {
                    "must": [
                      {
                        "nested": {
                          "path": "objects",
                          "query": {
                            "bool": {
                              "must": [
                                {
                                  "match": {
                                    "objects.class": value
                                  }
                                }
                              ]
                            }
                          }
                        }
                      }
                    ]
                  }
                },
                "aggs": {
                  "camera": {
                    "terms": {
                      "field": "camera_id"
                    },
                    "aggs": {
                      "histo": {
                        "date_histogram": {
                          "field": "date",
                          "fixed_interval": "30m"
                        },
                        "aggs": {
                          "recent": {
                            "top_hits": { "size": 10000 }
                          }
                        }
                      }
                    }
                  }
                }
              })}
              dataField="objects.class"
              nestedField="objects"
              queryFormat="or"
              placeholder="Search by Class"
              autoSuggest={true}
              className="datasearch"
              innerClass={{
                "input": "searchbox",
                "list": "suggestionlist"
              }}>
            </DataSearch>
          </div>
          <div className={"display"}>
            <div className={"leftSidebar"}>

              <MultiList
                componentId="camera_id"
                dataField="camera_id"
                className="cameras"
                queryFormat="and"
                showCheckbox={true}
                showCount={true}
                placeholder="Search by Camera"
                showFilter={false}
                URLParams={false}
                react={{ "and": ["mainSearch"] }}
                innerClass={{
                  label: "list-item",
                  input: "list-input"
                }}
              />
              <DateRange
                componentId="DateSensor"
                title="search by date"
                autoSuggest={true}
                dataField="date"
                queryFormat="date"
              />
              <div>
                <TagCloud
                  minSize={12}
                  maxSize={35}
                  tags={data}
                  onClick={tag => alert(`'${tag.value}' was selected!`)}
                /></div>
            </div>
            <div className={"mainBar"}>

              <ReactiveList
                size={200}
                dataField="time"
                pagination={false}
                showResultStats={true}
                react={{
                  "and": ["camera_id", "mainSearch", "authors", "RangeSliderSensor", "DateSensor"]
                }}
                componentId="SearchResult">
                {({
                  loading,
                  error,
                  rawData,
                  data,
                }) => {
                  function h(item, max_time, min_time) {

                    //var start = key_string.toString().slice(11,16)
                    //var end = key_string.toString().slice(11,14)+"30"
                    // console.log("key",start,end)
                    if (item.path) {
                      return (<ResultCard key={item._id}>
                        <div>
                          <img src={item.path} alt=" " width="100%" height="100%" />

                        </div>
                        <ResultCard.Title
                          dangerouslySetInnerHTML={{
                            __html: item.date
                          }}
                        />
                        <ResultCard.Description>
                          <div>
                            <div><b>time : </b> {item.time}</div></div>
                        </ResultCard.Description>
                      </ResultCard>)

                    }
                    var item = item._source

                    return (<><ResultCard key={item._id}>
                      <div>
                        <img src={item.path} alt=" " width="100%" height="100%" />

                      </div>
                      <ResultCard.Title
                        dangerouslySetInnerHTML={{
                          __html: item.date
                        }}
                      />
                      <ResultCard.Description>
                        <div><b>camera_id :</b> {item.camera_id}
                          <div><b>from : </b>  {min_time}  <b>   to:  </b> {max_time} <b> mins.</b> </div></div>
                      </ResultCard.Description>
                    </ResultCard>
                    </>)
                  }
                  var ElementList = {}
                  function addElement(ElementList, element) {
                    let newList = Object.assign(ElementList, element)
                    return newList
                  }
                  if (rawData) {
                    if (rawData.aggregations) {

                      try {
                        console.log("raw", rawData.aggregations.camera.buckets);
                        let k = rawData.aggregations.camera.buckets;
                        let x;
                        let ret = k.map(x => {
                          //console.log(x.doc_count)
                          //let hits =x.histo.buckets[0].recent.hits.hits
                          let m = x.histo.buckets.map(y => {
                            if (y.doc_count > 0) {
                              let hits = y.recent.hits.hits

                              let min_time = hits[0]._source.time
                              let max_time = hits[hits.length - 1]._source.time
                              let kk = 0
                              if (max_time < min_time) {
                                //console.log("yes",max_time,min_time)
                                kk = min_time
                                min_time = max_time
                                max_time = kk
                                //console.log("changed",max_time,min_time)
                              }
                              // let i;
                              // var k =hits[0]._id
                              // let videos={  k: {
                              //   src: "./"+hits[0]._source.path,
                              //   frames: 2,
                              //   cols: 1,
                              //   fps:2,
                              //   loops :1,
                              //   onEnd: "onEndfunc"
                              // }};
                              let clip1 = {}
                              let element = {}
                              let i;
                              for (i = 0; i < hits.length; i++) {
                                // clip1= {
                                //   src: "./"+hits[i]._source.path,
                                //   frames: 2,
                                //   cols: 1,
                                //   fps:2,
                                //   loops :1,
                                //   onEnd: "onEndfunc"
                                // }

                                // videos[hits[i]._id] = clip1
                                element = {}
                                element[hits[i]._id] = {
                                  src: "./" + hits[i]._source.path, frames: 2, cols: 1, loops: 1, onEnd: function () {
                                    console.log('element1 ended.');
                                  }
                                }
                                addElement(ElementList, element)
                              }
                              console.log("dict", ElementList)

                              //console.log("time",max_time)
                              //hits.map(data=>console.log(data._source)); 
                              return (<ReactiveList.ResultCardsWrapper>

                                 {//hits.map(e=>h(e,x.key_as_string))
        
          h(hits[0],max_time,min_time)
            }  
                                {/* <CanvidApp clipsData={ElementList} /> */}
                              </ReactiveList.ResultCardsWrapper>)
                            }
                          })
                          return (m)

                        })

                        //console.log("k",k)
                        // for (x=0; x< k.length;x++){
                        //   console.log("x",x)
                        //   }
                        console.log('ret',ret)
                        return (
                          
                          <>{ret}</>
                        )

                      }
                      catch (err) {
                        console.log("err", err)
                        return (
                          <ReactiveList.ResultCardsWrapper>
                            {data.map(h)
                            }
                          </ReactiveList.ResultCardsWrapper>
                        )
                      }
                    };
                  }
                  if (loading) {
                    return <div>Fetching Results.</div>
                  }
                  if (error) {
                    return (
                      <div>
                        Something went wrong! Error details {JSON.stringify(error)}
                      </div>
                    )
                  }
                  return (

                    <ReactiveList.ResultCardsWrapper>

                      {data.map(h)
                      }
                    </ReactiveList.ResultCardsWrapper>
                  )
                }
                }
              </ReactiveList>
            </div>
          </div></ReactiveBase>

      </div>
    );
  }
}


export default Main;

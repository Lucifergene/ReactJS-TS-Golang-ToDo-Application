package main

import (
	"crypto/tls"
	"fmt"
	"net"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"github.com/julienschmidt/httprouter"
	"gopkg.in/mgo.v2"

	"github.com/Lucifergene/todo-golang-backend/controllers"
)

func main() {

	r := httprouter.New()
	uc := controllers.NewUserController(getSession())

	r.GET("/api/todos", uc.GetUsersList)
	r.GET("/api/todo/:id", uc.GetUser)
	r.POST("/api/todo", uc.CreateUser)
	r.DELETE("/api/todo/:id", uc.DeleteUser)
	fmt.Println("Starting server on the port 5000...")
	http.ListenAndServe("localhost:5000", r)
}

func getSession() *mgo.Session {

	err := godotenv.Load()
	if err != nil {
		panic(err)
	}

	mongoPasswd := os.Getenv("MONGO_PASSWD")
	mongoUser := os.Getenv("MONGO_USER")

	tlsConfig := &tls.Config{}

	dialInfo := &mgo.DialInfo{
		Addrs: []string{
			"cluster0-shard-00-00.qiqen.mongodb.net:27017",
			"cluster0-shard-00-01.qiqen.mongodb.net:27017",
			"cluster0-shard-00-02.qiqen.mongodb.net:27017",
		},
		Username: mongoUser,
		Password: mongoPasswd,
	}
	dialInfo.DialServer = func(addr *mgo.ServerAddr) (net.Conn, error) {
		conn, err := tls.Dial("tcp", addr.String(), tlsConfig)
		return conn, err
	}

	s, err := mgo.DialWithInfo(dialInfo)

	if err != nil {
		panic(err)
	} else {
		fmt.Println("DB connected")
	}
	return s
}

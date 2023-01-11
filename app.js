const app = angular.module("App", ["ngRoute"]);
app.controller("ctrl", ($scope, $http) => {
    let getData = () => {
        $http.get("http://127.0.0.1:3302/data")
            .then((res) => {
                $scope.emps = res.data;
            }).catch((err) => alert(err.data));
    }
    getData();
    $scope.srchLoc = () => {
        loc = prompt("Enter Location");
        $http.get(`http://127.0.0.1:3302/data?loc=${loc}`)
            .then((res) => {
                $scope.emps = res.data;
            }).catch((err) => alert(err.data));

    }
    $scope.srchSal = () => {
        loc = prompt("Enter Salary for greater than:")
        sal = parseFloat(loc);
        if (isNaN(sal)) alert("enter valid salary")
        else {
            $http.get(`http://127.0.0.1:3302/data?sal=${sal}`)
                .then((res) => {
                $scope.emps = res.data;
            }).catch((err) => alert(err.data));
        }
    }
    $scope.reset = () => getData();

    $scope.del = () => {
        id = prompt("Enter id")
        id = parseInt(id)
        if (!isNaN(id)) {
            $http.get(`http://127.0.0.1:3302/delete?id=${id}`)
                .then((res) => {
                    getData();
                }).catch((err) => alert(err.data));
        } else {
            alert("enter valid id");
        }
    }

    $scope.edit = () => {
        id = prompt("Enter id")
        loc = prompt("Enter Location");
        $http.get(`http://127.0.0.1:3302/edit?id=${id}&loc=${loc}`)
            .then((res) => {
                getData()
            }).catch((err) => alert(err.data));
    }
})

app.controller("addctrl", ($scope, $http) => {
    $scope.data = {}
    $scope.save = () => {
        $http.post("http://127.0.0.1:3302/save", $scope.data)
        .then((res) => {
            alert("Success");
                }).catch((err) => alert(err.data));
    }
})
import "expose-loader?$!jquery"
import "expose-loader?jQuery!jquery"
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
require("../base/base.js")
import "../common/config.js"
import "../common/utils.js"

$("body").css("backgroundColor","green");
export var a=67;

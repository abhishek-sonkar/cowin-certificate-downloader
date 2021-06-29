import { Router, Switch, Route } from "react-router-dom";
import history from "./history";
import Login from './Login';
import Verify from './Verify';
import Dwnld from './Dwnld';
export default function Routes(props) {
    return (
        <Router history={history}>
            <Switch>
                <Route path='/login'>
                    <Login 
                        getOtpHandler={props.getOtpHandler}
                        loading={props.loading}
                        err={props.err}
                        errText={props.errText}
                    />
                </Route>
                <Route path='/verify'>
                    <Verify
                        verifyOtpHandler={props.verifyOtpHandler}
                        loading={props.loading}
                        err={props.err}
                        errText={props.errText}
                    />
                </Route>
                <Route path='/download'>
                    <Dwnld 
                        downloadHandler={props.downloadHandler}
                        loading={props.loading}
                        err={props.err}
                        errText={props.errText}
                    />
                </Route>
            </Switch>
        </Router>
    )
}
import appIcon from "../static/icons/appicon.svg"
import * as actions from "../actions/index"
import * as typeMenu from "../constant/index"
import { connect } from "react-redux";
const Menu = (props) => {
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            {/* <!-- Sidebar - Brand --> */}
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="#" onClick={() => { props.onHandelSetTypeMeNu(typeMenu.MENUTINHLICHTRUC) }}>
                <div className="sidebar-brand-icon ">
                    <img src={appIcon} width={50} className="img-logo" />
                </div>
                <div className="sidebar-brand-text mx-3">BVND115</div>
            </a>

            {/* <!-- Divider --> */}
            <hr className="sidebar-divider my-0" />
            {/* <!-- Nav Item - Dashboard --> */}
            <li className="nav-item active">
                <a className="nav-link" onClick={() => { props.onHandelSetTypeMeNu(typeMenu.MENUTINHLICHTRUC) }} href="#">
                    <i className="fas fa-calendar-alt"></i>
                    <span>Tính lịch trực</span></a>
            </li>

            {/* <!-- Divider --> */}
            <hr className="sidebar-divider" />

            <li className="nav-item active">
                <a className="nav-link" onClick={() => { props.onHandelSetTypeMeNu(typeMenu.MENUNHANVIEN) }} href="#">
                    <i className="fas fa-user-friends"></i>
                    <span>Nhân viên</span></a>
            </li>
        </ul>
    )
}
const mapStateToProp = (state) => {
    return {
    };
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        onHandelSetTypeMeNu: (type) => {
            dispatch(actions.setTypeMenu(type));
        },
    };
};
export default connect(mapStateToProp, mapDispatchToProps)(Menu)

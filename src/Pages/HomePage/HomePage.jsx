import { useState } from "react";
import { assets } from "../../assets/assets.js";
import "./HomePage.css"
import json from "../../data.json"

function HomePage() {

    const [pathInput, setPathInput] = useState(false);

    const [path, setPath] = useState("This PC /")

    const [data, setData] = useState(json)

    function AssignImg({ type }) {
        if (type == "folder") {
            return (<img src={assets.defaultFolder} alt="" className="typeIcon" />)
        } else if (type == "drive") {
            return (<img src={assets.drive} alt="" className="typeIcon" />)
        } else if (type == "txt") {
            return (<img src={assets.textFile} alt="" className="typeIcon" />)
        } else {
            return (<img src={assets.thisPC} alt="" className="typeIcon" />)
        }
    }

    const List = ({ list }) => {
        const [isExpanded, setIsExpanded] = useState({})
        function toogleExpanded(name) {
            setIsExpanded((prev) => ({ ...prev, [name]: !prev[name] }))
        }
        return (
            <div className="list">
                {list.map((node) => (
                    <div key={node.id} className="nodeCont">
                        <div className="node">
                            {node.children && <img src={assets.Arrow} alt="" className={isExpanded?.[node.name] ? `notExpandedIcon` : `ExpandedIcon`} onClick={() => toogleExpanded(node.name)} />}
                            <AssignImg type={node.type} />
                            <span>{node.name}</span>
                        </div>
                        {node.children && isExpanded?.[node.name] && <List list={node.children} />}
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="homePage">
            <div className="action-bar">
                <div className="options">
                    <div className="option">
                        <img src={assets.createIcon} alt="" className="icons" />
                        <span>New</span>
                    </div>
                </div>

                <div className="options">
                    <div className="option">
                        <img src={assets.cutIcon} alt="" className="icons" />
                    </div>
                    <div className="option">
                        <img src={assets.copyIcon} alt="" className="icons" />
                    </div>
                    <div className="option">
                        <img src={assets.pasteIcon} alt="" className="icons" />
                    </div>
                    <div className="option">
                        <img src={assets.renameIcon} alt="" className="icons" />
                    </div>
                    <div className="option">
                        <img src={assets.shareIcon} alt="" className="icons" />
                    </div>
                </div>

                <div className="options">
                    <div className="option">
                        <img src={assets.sortIcon} alt="" className="icons" />
                        <span>Sort</span>
                    </div>
                    <div className="option">
                        <img src={assets.viewIcon} alt="" className="icons" />
                        <span>View</span>
                    </div>
                </div>
            </div>
            <div className="top-bar">
                <div className="navigationBtns">
                    <div className="top-bar-back">
                        <img src={assets.navigationArrowBack} alt="" className="icons top-barIcons" />
                    </div>
                    <div className="top-bar-forward">
                        <img src={assets.navigationArrowForward} alt="" className="icons top-barIcons" />
                    </div>
                    <div className="top-bar-up">
                        <img src={assets.navigationArrowUp} alt="" className="icons top-barIcons" />
                    </div>
                </div>

                <div className="top-bar-path">
                    {!pathInput && (<div className="path" onClick={() => { setPathInput(true) }}>
                        <img src={assets.Arrow} alt="" className="icons" />
                    </div>)}
                    {pathInput && (<input type="text" className="pathInput" name="search" placeholder="" value={path} onChange={(e) => setPath(e.target.value)} />)}
                </div>
                <div className="top-bar-search">
                    <img src={assets.searchIcon} alt="" className="icons" />
                    <input type="text" className="searchInput" name="search" placeholder="Search" />
                </div>
            </div>
            <div className="Workspace">
                <div className="sidebar-nav">
                    <div className="dataTree">
                        <List list={data} />
                    </div>
                </div>
                <div className="main-window" onClick={() => { setPathInput(false) }}></div>
            </div>
            <div className="bottom-info">
                <span className="itemCount">15 items</span>
                <div className="viewStyle">
                    <img src={assets.listViewIcon} alt="" />
                    <img src={assets.gridViewIcon} alt="" className="selectedViewStyle" />
                </div>
            </div>
        </div>
    )
}

export default HomePage;
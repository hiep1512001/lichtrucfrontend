import { motion } from 'framer-motion';
import DataTable from 'react-data-table-component';
const ToolXemLichTruc = () => {
    const columns = [
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,
            reorder: true,
        },
        {
            name: 'Director',
            selector: row => row.director,
            sortable: true,
            reorder: true,
        },
        {
            name: 'Year',
            selector: row => row.year,
            sortable: true,
            reorder: true,
        },
    ];
    return (<div>
        <motion.div
            key="component1"
            initial={{ x: '-100%' }}       // Vị trí ban đầu ra ngoài màn hình (bên phải)
            animate={{ x: 0 }}            // Vị trí cuối cùng (hiển thị trong màn hình)
            exit={{ x: '100%' }}         // Khi rời đi, di chuyển ra ngoài màn hình (bên trái)
            transition={{ duration: 0.5 }}  // Thời gian chuyển động
            className="component-box"
        >
            <div className='row'>
                <div className="card border-left-primary shadow h-70 py-2 mb-4 mt-4 col-12">
                    <div className="card-header py-3">
                        <div className='col-6'>
                            <h6 className="m-0 font-weight-bold text-primary">Bảng chấm công nhân viên </h6>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className='row'>
                            <div className='col-1'></div>
                            <div className="col-11 table-responsive">
                                {/* <DataTable
                                    title="Movie List"
                                    columns={columns}
                                    data={data}
                                    fixedHeader={fixedHeader}
                                    fixedHeaderScrollHeight={fixedHeaderScrollHeight}
                                    pagination
                                /> */}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </motion.div>
    </div>)
}
// const Template = args => <FixedHeaderStory {...args} />;

// export const FixedHeader = Template.bind({});

// FixedHeader.args = {
//     fixedHeader: true,
//     fixedHeaderScrollHeight: '300px',
// };
export default ToolXemLichTruc
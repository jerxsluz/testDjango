import {ChangeEvent, useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import * as S from "./MarketBoardWrite-styles";
import { Switch } from 'antd';
import DaumPostcodeEmbed from "react-daum-postcode";
import {Modal, Button, Popover} from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';

export default function MarketBoardWrite(props){
    const router = useRouter()
    const [reqData, setReqData] = useState([])
    const [isOpen, setIsOpen] = useState(false);

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [price, setPrice] = useState(0)
    const [state, setState] = useState(false);


    const [isActive, setIsActive] = useState(false)
    const [titleError, setTitleError] = useState("");
    const [contentError, setContentError] = useState("");
    const [priceError, setPriceError] = useState("");

    const [zipcode, setZipcode] = useState("");
    const [address, setAddress] = useState("");
    const [addressDetail, setAddressDetail] = useState("");

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };


    const onChangeTitle = (event) => {
            setTitle(event.target.value)

           if (event.target.value !== "") {
               setTitleError("");
           }

           if (
               event.target.value !== "" &&
               content !== "" && price !== 0
           ) {
               setIsActive(true);
           } else {
               setIsActive(false);
           }
       };


    const onChangeContent = (event) => {
            setContent(event.target.value);

            if (event.target.value !== "") {
                setContentError("");
            }

            if (
                title !== "" &&
                event.target.value !== "" &&
                price !== 0
            ) {
                setIsActive(true);
            } else {
                setIsActive(false);
            }
        };

    const onChangePrice = (event) => {
        setPrice(event.target.value);

        if (event.target.value !== "") {
            setPriceError("");
        }

        if (
            title !== "" &&
            content !== "" &&
            event.target.value !== 0
        ) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    };


    const onChange = () => {
        setState(!state)
    };


    const onChangeAddressDetail = (event) => {
        setAddressDetail(event.target.value);
    };

    const onClickAddressSearch = () => {
        setIsOpen((prev) => !prev);
    };

    const onCompleteAddressSearch = (data) => {
        setAddress(data.address);
        setZipcode(data.zonecode);
        setIsOpen((prev) => !prev);
    };

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };



    const onClickSubmit = async () => {
        if (title === "") {
            setTitleError("제목을 입력해주세요.");
        }
        if (content === "") {
            setContentError("내용을 입력해주세요.");
        }

        if (!imageUrl) {
            alert("사진을업로드하거리")
        }

        if (title !== "" && content !== "" && imageUrl) {




            const combinedString = `${address}, ${addressDetail}`;





            const formData = new FormData();

            formData.append('image', imageUrl);
            formData.append('title', title);
            formData.append('content', content);
            formData.append('boardType', 2);
            formData.append('like_num', 0);
            formData.append('userID', 1);
            formData.append('address', combinedString);

            const result = await axios.post("http://127.0.0.1:8000/board/", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }

            })
                .then(function (response) {
                    console.log(response.data);
                    alert("게시물 등록이 정상적으로 완료되었습니다!");
                    router.push(`/marketBoard/${response.data.boardID}`);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );







    return (
        <>
            <S.Wrapper>
                {/* <S.Title>{props.isEdit ? "게시글 수정" : "게시글 등록"}</S.Title>*/}
                <S.Title>상품 등록</S.Title>
                <S.InputWrapper>
                    <S.Label>제목</S.Label>
                    <S.Subject
                        type="text"
                        placeholder="제목을 작성해주세요."
                        onChange={onChangeTitle}
                        /*defaultValue={props.data?.fetchBoard.title}*/
                    />
                    <S.Error>{titleError}</S.Error>
                </S.InputWrapper>

                <S.InputWrapper>
                    <S.Label>가격</S.Label>
                    <S.Subject
                        type="text"
                        placeholder="가격을 입력해주세요(숫자만 입력 가능)"
                        onChange={onChangePrice}
                        /*defaultValue={props.data?.fetchBoard.title}*/
                    />
                    <S.Error>{contentError}</S.Error>
                </S.InputWrapper>


                <S.InputWrapper>
                    <S.Label>설명</S.Label>
                    <S.Contents
                        placeholder="설명을 작성해주세요."
                        onChange={onChangeContent}
                        /* defaultValue={props.data?.fetchBoard.contents}*/
                    />
                    <S.Error>{contentError}</S.Error>
                </S.InputWrapper>


                <S.ImageWrapper>
                    <S.Label>상품 사진을 추가해주세요!</S.Label>
                    {/*     <S.ImageBox>
                        {fileUrls.map((el, index) => (
                            <Uploads01
                                key={uuidv4()}
                                index={index}
                                fileUrl={el}
                                onChangeFileUrls={onChangeFileUrls}
                            />
                        ))}
                    </S.ImageBox>*/}

                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                    >
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt="avatar"
                                style={{
                                    width: '100%',
                                }}
                            />
                        ) : (
                            uploadButton
                        )}
                    </Upload>



                </S.ImageWrapper>


                <S.InputWrapper>
                    <S.Label>주소</S.Label>
                    <S.ZipcodeWrapper>
                        <S.Zipcode
                            placeholder="07250"
                            readOnly
                            value={zipcode}
                        />
                        <S.SearchButton onClick={onClickAddressSearch}>
                            우편번호 검색
                        </S.SearchButton>
                        {isOpen &&(
                            <Modal title="위치를 추가해주세요!"
                                   open={true}
                                   onOk={onClickAddressSearch}
                                   onCancel={onClickAddressSearch}>
                                <DaumPostcodeEmbed onComplete={onCompleteAddressSearch}/>
                            </Modal>
                        )}
                    </S.ZipcodeWrapper>
                    <S.Address
                        readOnly
                        value={address}
                    />
                    <S.Address
                        onChange={onChangeAddressDetail}
                    />
                </S.InputWrapper>

                <S.InputWrapper>
                    <S.Label>판매상태</S.Label>
                    <S.Label>{state? "판매중" : "판매완료"}</S.Label>
                    <Switch defaultChecked onChange={onChange} />

                </S.InputWrapper>



                <S.ButtonWrapper>
                    {/*   <S.SubmitButton
            onClick={props.isEdit ? props.onClickUpdate : props.onClickSubmit}
            isActive={props.isEdit ? true : props.isActive}
          >
            {props.isEdit ? "수정하기" : "등록하기"}
          </S.SubmitButton>*/}
                    <S.SubmitButton onClick={onClickSubmit}>등록하기</S.SubmitButton>
                </S.ButtonWrapper>
            </S.Wrapper>
        </>

    )



}
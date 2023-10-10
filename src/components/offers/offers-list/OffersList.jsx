import React from "react";
import { Col, Empty, Row, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Offer } from "@spanic/react-interview-components";
import { changeSelectedQty } from "../../../store/offers-slice";
import { fetchOffers } from "../../../thunks/offers.thunks";
import styled from "styled-components";
import { useEffect } from "react";

export default function OffersList() {
  const dispatch = useDispatch();

  const { offers, loading } = useSelector((state) => state.offers);

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  const OfferWrapper = (offer) => (
    <Col
      xs={{ span: 24 }}
      sm={{ span: 12 }}
      md={{ span: 8 }}
      lg={{ span: 6 }}
      key={offer.id}
    >
      <Offer
        data={offer}
        selectedQty={offer.selected}
        onChangeQty={() =>
          dispatch(
            changeSelectedQty({ id: offer.id, selected: !offer.selected })
          )
        }
      />
    </Col>
  );

  if (loading) {
    return (
      <SpinContainer>
        <Spin />
      </SpinContainer>
    );
  }

  return offers.length ? (
    <Row gutter={[16, 16]}>{offers.map(OfferWrapper)}</Row>
  ) : (
    <Empty />
  );
}

const SpinContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

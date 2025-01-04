import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import useResponseUseFetch from "../hooks/useResponseUseFetch";
import { urlUserCourses, urlUserPayments } from "../endpoints";

const PurchasedHistory = () => {
  const {
    data: payments,
    loading: loadingPayments,
    error: errorPayments,
  } = useResponseUseFetch(urlUserPayments);
  const {
    data: courses,
    loading: loadingCourses,
    error: errorCourses,
  } = useResponseUseFetch(urlUserCourses);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  //   const paginatedPayments = useMemo(() => {
  //     if (!payments) return [];
  //     const startIndex = (currentPage - 1) * itemsPerPage;
  //     return payments.slice(startIndex, startIndex + itemsPerPage);
  //   }, [payments, currentPage, itemsPerPage]);

  const detailedPayments = useMemo(() => {
    if (!payments || !courses) return [];
    return payments.map((payment) => {
      const course = courses.find((course) => course.id === payment.courseId);
      return { ...payment, course };
    });
  }, [payments, courses]);

  
  return (
    <Box sx={{ padding: 5 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, marginBottom: 3 }}>
        Satın Alma Geçmişi
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Satın Alma Tablosu">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="right">Tarih</TableCell>
              <TableCell align="right">Toplam Fiyat</TableCell>
              <TableCell align="right">Ödeme Türü</TableCell>
              <TableCell align="right">Durum</TableCell>
              <TableCell align="right">Makbuz</TableCell>
              <TableCell align="right">Fatura</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {detailedPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell component="th" scope="row">
                  {payment.course?.name} <br/>
                       {payment.course?.description}
                </TableCell>
                <TableCell align="right" component="th" scope="row">
                  {new Date(payment.paymentDate).toLocaleDateString()}
                </TableCell>
                <TableCell align="right">₺ {payment.totalPrice}</TableCell>
                <TableCell align="right">{payment.paymentMethod}</TableCell>
                <TableCell align="right">{payment.paymentStatus}</TableCell>
                <TableCell align="right">
                  <Typography
                    sx={{
                      color: "blue",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    Makbuz
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  {payment.paymentStatus === "Success" ? (
                    <Typography
                      sx={{
                        color: "blue",
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      Fatura
                    </Typography>
                  ) : (
                    <Typography color="error">Mevcut değil</Typography>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 4,
        }}
      >
        <Pagination
          count={Math.ceil((payments?.length || 0) / itemsPerPage)}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
        />
      </Box>
    </Box>
  );
};

export default PurchasedHistory;

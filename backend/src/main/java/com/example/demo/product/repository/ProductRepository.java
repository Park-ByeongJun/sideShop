package com.example.demo.product.repository;

import com.example.demo.product.Product;

import org.springframework.stereotype.Repository;

import java.util.List;
import org.springframework.jdbc.core.JdbcTemplate;

@Repository 
public class ProductRepository {
    private final JdbcTemplate jdbcTemplate;

    public ProductRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Product> findAll() {
        String sql = "SELECT id, name, price FROM products ORDER BY id";

        return jdbcTemplate.query(sql, (row, index) ->
                new Product(
                    row.getLong("id"),
                    row.getString("name"),
                    row.getInt("price")
                ));
    }
}

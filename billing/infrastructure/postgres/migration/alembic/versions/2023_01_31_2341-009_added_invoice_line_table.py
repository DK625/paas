"""Added Invoice Line table

Revision ID: 009
Revises: 008
Create Date: 2023-01-31 23:41:52.361357

"""
from alembic import op
import sqlalchemy as sa
import infrastructure.postgres.tables.base

# revision identifiers, used by Alembic.
revision = '009'
down_revision = '008'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('invoice_lines',
    sa.Column('id', sa.String(length=32), nullable=False),
    sa.Column('invoice_id', sa.String(length=32), nullable=False),
    sa.Column('created_at', infrastructure.postgres.tables.base.TimeStamp(), nullable=True),
    sa.Column('deleted_at', infrastructure.postgres.tables.base.TimeStamp(), nullable=True),
    sa.Column('sub_item_id', sa.String(length=32), nullable=False),
    sa.Column('quantity', sa.Integer(), nullable=True),
    sa.Column('price_id', sa.String(length=32), nullable=False),
    sa.Column('description', sa.String(length=255), nullable=True),
    sa.Column('amount', sa.Float(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_invoice_lines_created_at'), 'invoice_lines', ['created_at'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_invoice_lines_created_at'), table_name='invoice_lines')
    op.drop_table('invoice_lines')
    # ### end Alembic commands ###
